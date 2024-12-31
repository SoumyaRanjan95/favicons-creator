
from pathlib import Path
import asyncio 
import math

from PIL import Image as PILImage

from favicons.constants import HTML_LINK_TEMPLATE,ALL_SUPPORTED_FORMATS
from favicons.exceptions import FaviconsNotSupportedError
from favicons.utils import generate_icon_types, validate_path
from favicons._types import Color
from favicons._types import FaviconProperties

class Favicons:

    def __init__(
            self,
            source,
            output_directory,
            background_color="#000000",
            transparent =True,
            base_url="/",
            *args,
            **kwargs,

        ):
        self._validated = False
        self._output_directory = output_directory
        self._formats = tuple(generate_icon_types())
        self.transparent = transparent
        self.base_url = base_url
        self.background_color = Color(background_color)
        self.generate = self.sgenerate
        self.completed = 0
        self._temp_source = None

        if isinstance(source, str):
            source = Path(source)
        self._source = source

    def _validate(self):
        self.source = validate_path(self._source)
        self.output_directory = validate_path(self._output_directory,create=True)
        if self.source.suffix.lower() not in ALL_SUPPORTED_FORMATS:
            raise FaviconsNotSupportedError(self.source)
        self._validated = True

    def __enter__(self):
        self._validate()
        self.generate = self.sgenerate
        return self
    
    def __exit__(self, exe_type = None,exe_value = None, traceback = None):
        self._close_temp_source()
        pass

    async def __aenter__(self):
        self._validate()
        self.generate = self.sgenerate
        return self
    
    async def __aexit__(self, exe_type = None,exe_value = None, traceback = None):
        self._close_temp_source()
        pass

    def _close_temp_source(self):
        if self._temp_source is not None:
            try:
                self._temp_source.unlink()
            except FileNotFoundError:
                pass
    @staticmethod
    def _get_center_point(background, foreground):
        bg_x,bg_y = background.size
        fg_x,fg_y = foreground.size

        x1 = math.floor((bg_x / 2) - (fg_x / 2))
        y1 = math.floor((bg_y / 2) - (fg_y / 2))
        x2 = math.floor((bg_x / 2) + (fg_x / 2))
        y2 = math.floor((bg_y / 2) + (fg_y / 2))
        return (x1, y1, x2, y2)
    
    def _generate_single(self,format_properties):
        with PILImage.open(self.source) as src:
            output_file = self.output_directory/str(format_properties)
            bg = self.background_color.colors

            if self.transparent:
                bg += (0,)

            dst = PILImage.new("RGBA",format_properties.dimensions)
            src.thumbnail(format_properties.dimensions)
            dst.paste(src, box=self._get_center_point(dst,src))
            dst.save(output_file,format_properties.image_fmt)

            self.completed += 1
    async def _agenerate_single(self, format_properties):
        return self._generate_single(format_properties)
    
    def sgenerate(self):
        if not self._validated:
            self._validate()
        for fmt in self._formats:
            self._generate_single(fmt)

    async def agenerate(self):
        if not self._validated:
            self._validate()
        await asyncio.gather(*(self._agenerate_single(fmt) for fmt in self._formats))

    def html_gen(self):
        for fmt in self._formats:
            yield HTML_LINK_TEMPLATE.format(
                rel = fmt.rel,
                type=f"image/{fmt.image_fmt}",
                href=self.base_url+str(fmt)
            )

    def html(self):
        return tuple(self.html_gen())
    

    def formats(self):
        return tuple(f.dict() for f in self._formats)



    def filenames_gen(self, prefix = False):
        for fmt in self._formats:
            filename = str(fmt)
            if prefix:
                filename = self.base_url + filename
            yield filename

    def filenames(self, prefix= False):
        return tuple(self.filenames_gen(prefix=prefix))