# setup-advancedinstaller

This action sets up an [Advanced Installer](https://www.advancedinstaller.com/) tool.

## Usage

See [action.yml](action.yml)

Basic:

```yaml
steps:
- uses: actions/checkout@v2
- uses: slidoapp/setup-advancedinstaller@v1
  with:
    version: '18.3'
- run: advinst.exe project.aip
```

## License

Scripts and documentation in this project are released under the [MIT License](LICENSE)
