from pathlib import Path
from tempfile import mkstemp


from favicons.constants import ICON_TYPES
from favicons.exceptions import FaviconsError, FaviconNotFoundError
from favicons._types import FaviconProperties

def validate_path(path, must_exists=True,create=False):

    if isinstance(path,str):
        try:
            path = Path(path)
        except TypeError as err:
            raise FaviconsError("{path} is not a valid path",path=path) from err
        
    if create:
        if path.is_dir() and not path.exists():
            path.mkdir(parents=True)
        elif not path.is_dir() and path.parent.exists():
            path.parent.mkdir(parents=True)

    if must_exists and not path.exists():
        raise FaviconNotFoundError(path)
    
    return path


def generate_icon_types():
    for icon_type in ICON_TYPES:
        yield FaviconProperties(**icon_type)

    

