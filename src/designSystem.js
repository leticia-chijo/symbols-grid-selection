"use strict"

import { DEFAULT_ICONS } from "@symbo.ls/default-icons"

const COLOR = {
  modalBackground: "white",
  modalText: "black",
  gridBackground: "white",
  active: "#3D7BD9",
  inactive: "#E8F1FF"
}

const GRADIENT = {}

const THEME = {
  document: {
    "@dark": {
      color: "black",
      background: "#DDA4EB"
    }
  }
}

const FONT = {
  Europa: [
    {
      url: "https://raw.githubusercontent.com/limbforge/website/master/app/assets/fonts/europa-regular-webfont.woff",
      fontWeight: 400
    },
    {
      url: "https://raw.githubusercontent.com/limbforge/website/master/app/assets/fonts/europa-bold-webfont.woff",
      fontWeight: 600
    }
  ]
}

const FONT_FAMILY = {
  Europa: {
    value: '"Europa"',
    type: "sans-serif"
  }
}

const TYPOGRAPHY = {
  base: 16,
  ratio: 1.25
}

const SPACING = {}

const options = {
  verbose: false,
  useReset: true,
  useDocumentTheme: true,
  useFontImport: true,
  useVariable: true,
  useSvgSprite: true,
  useIconSprite: true
}

export default {
  ...options,
  COLOR,
  GRADIENT,
  THEME,
  ICONS: DEFAULT_ICONS,
  TYPOGRAPHY,
  SPACING,
  FONT,
  FONT_FAMILY
}
