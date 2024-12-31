class FaviconProperties:

    def __init__(self, image_fmt, dimensions, prefix, rel=None):
        self.image_fmt = image_fmt
        self.rel = rel
        self.dimensions = dimensions
        self.prefix = prefix

    @property
    def width(self):
        return self.dimensions[0]
    
    @property
    def height(self):
        return self.dimensions[1]
    
    def __repr__(self) -> str:
        attr_names = (a for a in self.__dir__() if not a.startswith("_"))
        attrs = (f"{a}={getattr(self, a)}" for a in attr_names)
        return f"{self.__class__.__name__}({', '.join(attrs)})"

    def __str__(self) -> str:
        return self._get_filename_parts()

    def dict(self):
        return {
            "image_format": self.image_fmt,
            "dimensions": self.dimensions,
            "prefix": self.prefix,
            "rel": self.rel,
        }
    
    def _get_filename_parts(self):
        parts = (self.prefix,)
        if self.image_fmt == 'ico':
            parts+=(
                ".",
                self.image_fmt,
            )

        else:
            parts += (
                "-",
                "x".join(str(d) for d in self.dimensions),
                ".",
                self.image_fmt,
            )
        return "".join(parts)