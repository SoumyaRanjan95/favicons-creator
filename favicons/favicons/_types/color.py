import re
from typing import Collection

from favicons.exceptions import FaviconsError, FaviconColorError


_RGB_STR_PATTERN = re.compile(r"^rgb\((\d+),\s?(\d+),\s?(\d+)\)$")
_HEX_STR_PATTERN3 = re.compile(r"^\#?([A-Fa-f0-9])([A-Fa-f0-9])([A-Fa-f0-9])$")
_HEX_STR_PATTERN6 = re.compile(r"^\#?([A-Fa-f0-9]{2})([A-Fa-f0-9]{2})([A-Fa-f0-9]{2})$")


def get_matches(pattern, search):
    matches = pattern.search(search)
    if matches is not None:
        for match in matches.groups():
            yield match
    else:
        raise FaviconsError(f"Pattern {repr(pattern)} did not match anything in {repr(search)}")


class Color:

    red = None
    green = None
    blue =None

    def __init__(self, color):

        rgb = None
        if isinstance(color, str):
            rgb = self._validate_string(color)
        elif isinstance(color, Collection):
            rgb = self._validate_rgb_iter(color)
        else:
            raise FaviconColorError(color)
        if rgb is None:
            raise FaviconColorError(color)
        
        color_names = ("red", "green","blue")
        for i, color_num in enumerate(rgb):
            setattr(self, color_names[i], color_num)

    def as_hex(self):

        def hexstr(num):
            return hex(num).replace("0x", "").zfill(2)

        colors = (hexstr(c) for c in (self.red, self.green, self.blue))

        return "#" + "".join(colors)     

    def as_rgb(self):
        return f"rgb({', '.join(str(c) for c in (self.red, self.green, self.blue))})"        
    
    @property
    def colors(self):
        return (self.red, self.green, self.blue)      

    def _validate_string(self,colorstr):
        rgb = None

        if _RGB_STR_PATTERN.match(colorstr):
            rgb = self._parse_rgbstr(colorstr)

        if _HEX_STR_PATTERN3.match(colorstr):
            rbg = self._parse_hex(colorstr, 3)

        if _HEX_STR_PATTERN6.match(colorstr):
            rgb = self._parse_hex(colorstr,6)

        if rgb is None:
            raise FaviconColorError(colorstr)
        
        return rgb
    
    @staticmethod
    def _validate_rgb_iter(rgb_iter):
        if not len(rgb_iter) == 3:
            raise FaviconColorError(rgb_iter)
        
        for i in rgb_iter:
            try:
                num = int(i)
                if num not in range(0,256):
                    raise FaviconColorError(rgb_iter)
                yield num
                
            except TypeError as err:
                    raise FaviconColorError(rgb_iter) from err

    @staticmethod
    def _parse_rgbstr(rgb_str):
        for digit in get_matches(_RGB_STR_PATTERN, rgb_str):
            num = int(digit)
            if num not in range(0,256):
                raise FaviconColorError(rgb_str)
            yield num

    @staticmethod
    def _parse_hex(hex_str, length):
        rgb = None
        if length == 3:
            rgb = (s + s for s in get_matches(_HEX_STR_PATTERN3,hex_str))
        elif length == 6:
            rgb = get_matches(_HEX_STR_PATTERN6, hex_str)

        if rgb is None:
            raise FaviconColorError(hex_str)
        
        for c in rgb:
            yield int(c,16)
    
    def __str__(self):
        return self.as_hex()
    
    def __repr__(self):
        colors = (f"{c}={getattr(self, c)}" for c in ("red", "green", "blue"))
        return f"{self.__class__.__name__}({', '.join(colors)})"



        
    
