from favicons.constants import ALL_SUPPORTED_FORMATS
from pathlib import Path
class FaviconsError(Exception):

    def __init__(self, message,*args,**kwargs):
        self._message = message
        self._args = args
        self._kwargs = kwargs

    @property
    def message(self):
        return self._message.format(*self.args,**self._kwargs)
    
    @property
    def args(self):
        return self._args
    
    @property
    def kwargs(self):
        return dict(**self._kwargs)
    
    def __repr__(self):
        attrs = (
            f"messages:'{self.message}'",
            *(repr(a) for a in self._args),
            *(f"{k}={repr(v)}" for k, v in self.kwargs.items()),
        )

        return f"{self.__class__.__name__}({', '.join(attrs)})"
    def __str__(self):
        return self.message
    
    def dict(self):
        return {
            "message": self.message,
            "args": self.args,
            "kwargs": self.kwargs
        }
    
class FaviconNotFoundError(FaviconsError):

    def __init__(self, file: Path) -> None:
        """Set message."""
        super().__init__("{} does not exit.", str(file))

class FaviconColorError(FaviconsError):
    def __init__(self, color ,message):
        super().__init__(message,color=color)

class FaviconsNotSupportedError(FaviconsError):

    def __init__(self,file):
        one_of = ', '.join(f"'{f}'" for f in ALL_SUPPORTED_FORMATS)
        super().__init__(
            "Extension {extension} is not supported ({file}. But must be one of {one_of}.)",
            extension=file.suffix,
            file=str(file),
            one_of = one_of,
        )