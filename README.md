# setup-advancedinstaller

This action sets up an [Advanced Installer](https://www.advancedinstaller.com/) tool.

## Usage

See [action.yml](action.yml)

Basic:

```yaml
steps:
- uses: actions/checkout@v2
- uses: slidoapp/setup-advancedinstaller@v2
  with:
    version: '18.3'
    license: ${{ secrets.ADVINST_LICENSE_KEY }}
- run: AdvancedInstaller.com /help
```

## License

Scripts and documentation in this project are released under the [MIT License](LICENSE)
