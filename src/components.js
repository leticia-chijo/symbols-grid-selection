"use strict"

import { Flex, Box } from "smbls"

// Helper Functions

const getBorderRadius = (row, col, totalRows, totalCols) => {
  if (row === 0 && col === 0) return "Y W W W"
  if (row === 0 && col === totalCols - 1) return "W Y W W"
  if (row === totalRows - 1 && col === 0) return "W W W Y"
  if (row === totalRows - 1 && col === totalCols - 1) return "W W Y W"
  return "W"
}

const resetGrid = (parent) => {
  Object.keys(parent).forEach((key) => {
    const i = parseInt(key)
    if (!isNaN(i) && parent[i]) {
      parent[i].setProps({ background: "inactive" })
    }
  })
}

const updateGridColors = (parent, cols, selectedRow, selectedCol) => {
  Object.keys(parent).forEach((key) => {
    const i = parseInt(key)
    if (!isNaN(i) && parent[i]) {
      const cellRow = Math.floor(i / cols)
      const cellCol = i % cols

      parent[i].setProps({
        background: cellRow <= selectedRow && cellCol <= selectedCol ? "active" : "inactive"
      })
    }
  })
}

const handleCellClick = (element, state, i) => {
  const selectedRow = Math.floor(i / state.cols)
  const selectedCol = i % state.cols

  const isSameSelection = state.selectedRow === selectedRow + 1 && state.selectedCol === selectedCol + 1

  state.update({
    selectedRow: isSameSelection ? 0 : selectedRow + 1,
    selectedCol: isSameSelection ? 0 : selectedCol + 1
  })

  if (isSameSelection) {
    resetGrid(element.parent)
  } else {
    updateGridColors(element.parent, state.cols, selectedRow, selectedCol)
  }
}

const createGridCells = (_, state) => {
  let cells = {}

  for (let i = 0; i < state.cols * state.rows; i++) {
    const row = Math.floor(i / state.cols)
    const col = i % state.cols
    const borderRadius = getBorderRadius(row, col, state.rows, state.cols)

    cells[i] = {
      extend: GridItem,
      props: { borderRadius },
      on: { click: (_, element, state) => handleCellClick(element, state, i) }
    }
  }

  return cells
}

// Components

export const GridItem = {
  extend: Box,
  props: {
    height: "B",
    width: "B",
    background: "inactive",
    cursor: "pointer",
    transition: "background-color 0.2s"
  }
}

export const GridComponent = {
  Grid: {
    props: (element, state) => ({
      background: "modalBackground",
      columns: `repeat(${state.cols}, 1fr)`,
      width: "fit-content",
      borderRadius: "Z",
      gap: "X",
      margin: "B auto",
      padding: "Z",
      style: { boxShadow: "0 0 50px 0 rgba(0, 0, 0, 0.05)" },
      children: createGridCells(element, state)
    })
  }
}

export const H1 = {
  text: "Grid Selection",
  props: {
    color: "modalText",
    fontFamily: "Europa",
    fontWeight: "bold",
    fontSize: "A",
    padding: "0 Z"
  }
}

export const Caption = (description, value) => ({
  extend: Flex,
  props: {
    fontFamily: "Europa",
    fontSize: "Z"
  },
  Description: {
    text: description,
    props: { color: "modalText", opacity: 0.65, padding: "0 Y 0 0" }
  },
  Value: {
    text: value,
    props: { color: "modalText" }
  }
})

export const Footer = {
  extend: Flex,
  props: { justifyContent: "space-between", padding: "0 Z" },
  Caption1: Caption("Selection coordinates:", "{{ selectedCol }}, {{ selectedRow }}"),
  Caption2: Caption("Total cells selected:", (_, state) => `${state.selectedCol * state.selectedRow}`)
}

export const Modal = {
  state: { cols: 5, rows: 5, selectedCol: 0, selectedRow: 0 },
  props: {
    minWidth: 350,
    maxHeight: "90vh",
    overflowY: "auto",
    background: "gridBackground",
    padding: "A",
    borderRadius: "A",
    style: { boxShadow: "0 0 50px -10px rgba(0, 0, 0, 0.35)" } 
  },
  H1: {},
  GridComponent: {},
  Footer: {}
}
