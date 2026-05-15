import { econPrepFlowchart, econPrepMapNodes } from '../mockData'

export const econPrepMapById = Object.fromEntries(econPrepMapNodes.map((node) => [node.id, node]))

export const flowById = Object.fromEntries(econPrepFlowchart.nodes.map((node) => [node.id, node]))

export function flowAnchor(node, side) {
  const cx = node.x + node.w / 2
  const cy = node.y + node.h / 2
  switch (side) {
    case 'right':
      return { x: node.x + node.w, y: cy }
    case 'left':
      return { x: node.x, y: cy }
    case 'bottom':
      return { x: cx, y: node.y + node.h }
    case 'top':
      return { x: cx, y: node.y }
    default:
      return { x: node.x + node.w, y: cy }
  }
}

export function flowEdgePath(fromNode, toNode, fromSide, toSide) {
  const p1 = flowAnchor(fromNode, fromSide)
  const p2 = flowAnchor(toNode, toSide)
  if (fromSide === 'bottom' && toSide === 'top') {
    const ym = (p1.y + p2.y) / 2
    return `M ${p1.x} ${p1.y} C ${p1.x} ${ym}, ${p2.x} ${ym}, ${p2.x} ${p2.y}`
  }
  const midx = (p1.x + p2.x) / 2
  return `M ${p1.x} ${p1.y} C ${midx} ${p1.y}, ${midx} ${p2.y}, ${p2.x} ${p2.y}`
}

export function gateDiamondPoints(node) {
  const cx = node.x + node.w / 2
  const cy = node.y + node.h / 2
  const rx = node.w / 2 + 4
  const ry = node.h / 2 + 4
  return `${cx},${cy - ry} ${cx + rx},${cy} ${cx},${cy + ry} ${cx - rx},${cy}`
}

export function stripInvalidMapCompletions(ids) {
  const set = new Set(ids)
  let changed = true
  while (changed) {
    changed = false
    for (const id of [...set]) {
      const node = econPrepMapById[id]
      if (!node) {
        set.delete(id)
        changed = true
        continue
      }
      const reqs = node.requires ?? []
      if (!reqs.every((r) => set.has(r))) {
        set.delete(id)
        changed = true
      }
    }
  }
  return [...set].sort()
}
