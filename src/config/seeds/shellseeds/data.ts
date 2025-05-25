// raw materials to record schedule records.
// data structures
export const phases = [
  // { id: 0, name: 'Select Phase' },
  { id: 1, name: 'Structure' },
  { id: 2, name: 'Walling' },
  { id: 3, name: 'Roof' },
  { id: 4, name: 'HVAC / Plumbing' },
];
export const categories = [
  // {phase_id: 0, id: 0, name: "Select Category"},
  { phase_id: 1, id: 1, name: 'Scaffolding' },
  { phase_id: 1, id: 2, name: 'Formwork' },
  { phase_id: 1, id: 3, name: 'Reinforcement' },
  { phase_id: 1, id: 4, name: 'Concrete' },
  { phase_id: 1, id: 5, name: 'Extras' },
  { phase_id: 1, id: 6, name: 'Timber' },
  { phase_id: 2, id: 7, name: 'Masonery brick' },
  { phase_id: 2, id: 8, name: 'Plasterboard' },
  { phase_id: 3, id: 9, name: 'Roof Structure' },
  { phase_id: 4, id: 10, name: 'Ventilation' },
  { phase_id: 4, id: 11, name: 'Plumbing' },
];

export const sub_categories = [
  { category_id: 1, id: 1, name: 'Tubes' },
  { category_id: 1, id: 2, name: 'Clamps' },
  { category_id: 1, id: 3, name: 'Boards' },
  { category_id: 2, id: 4, name: 'Plywood' },
  { category_id: 2, id: 5, name: 'Lumber' },
  { category_id: 2, id: 6, name: 'Form ties' },
  { category_id: 3, id: 7, name: 'Rebar T8' },
  { category_id: 3, id: 8, name: 'Rebar - T10' },
  { category_id: 3, id: 9, name: 'Rebar - T12' },
  { category_id: 3, id: 10, name: 'Rebar - T16' },
  { category_id: 3, id: 11, name: 'Rebar - T20' },
  { category_id: 3, id: 12, name: 'Rebar - T25' },
  { category_id: 3, id: 13, name: 'Rebar - T32' },
  { category_id: 3, id: 14, name: 'Wire mesh' },
  { category_id: 3, id: 15, name: 'I-beams' },
  { category_id: 3, id: 16, name: 'H-beams' },
  { category_id: 4, id: 17, name: 'Cement' },
  { category_id: 4, id: 18, name: 'Gravel' },
  { category_id: 4, id: 19, name: 'Sand' },
  { category_id: 5, id: 20, name: 'Curing compounds' },
  { category_id: 5, id: 21, name: 'Damp proof membrane' },
  { category_id: 6, id: 22, name: 'Beams' },
  { category_id: 6, id: 23, name: 'Columns' },
  { category_id: 6, id: 24, name: 'Framing' },
  { category_id: 7, id: 25, name: 'Concrete blocks' },
  { category_id: 7, id: 26, name: 'Clay bricks' },
  { category_id: 8, id: 27, name: 'Standard' },
  { category_id: 8, id: 28, name: 'Fire resistant' },
  { category_id: 8, id: 29, name: 'Water resistant' },
  { category_id: 8, id: 30, name: 'Cement board' },
  { category_id: 9, id: 31, name: 'Roof Trusses' },
  { category_id: 9, id: 32, name: 'Purlins' },
  { category_id: 9, id: 33, name: 'Sheathing' },
  { category_id: 9, id: 34, name: 'Water proof membrane' },
  { category_id: 9, id: 35, name: 'Roof material' },
  { category_id: 9, id: 36, name: 'Gutter' },
  { category_id: 9, id: 37, name: 'Nuts, Bolts and washers' },
  { category_id: 9, id: 38, name: 'Nails' },
  { category_id: 9, id: 39, name: 'Screws' },
  { category_id: 9, id: 40, name: 'Steel plates and brackets' },
  { category_id: 10, id: 41, name: 'Ductwork' },
  { category_id: 11, id: 42, name: 'Supply / Evacuation' },
];
export const items = [
  // many items
  {
    sub_category_id: 1,
    id: 1,
    item: {
      description: 'Dimensions',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 2,
    id: 2,
    item: {
      description: 'Right Angle Couplers',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'select',
      dynamic: false,
    },
  },

  {
    sub_category_id: 2,
    id: 3,
    item: {
      description: 'Swivel Couplers',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'select',
      dynamic: false,
    },
  },

  {
    sub_category_id: 2,
    id: 4,
    item: {
      description: 'Putlog Couplers',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'select',
      dynamic: false,
    },
  },

  {
    sub_category_id: 3,
    id: 5,
    item: {
      description: 'Dimensions',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 4,
    id: 6,
    item: {
      description: 'Dimensions',
      references: [],
      id: null,
      unit: 'sheet',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 5,
    id: 7,
    item: {
      description: 'Dimensions',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 6,
    id: 8,
    item: {
      description: 'Specs',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 7,
    id: 9,
    item: {
      description: '8mm Grade 40',
      references: [],
      id: null,
      unit: 'm',
      quantity: null,
      kind: 'select',
      dynamic: false,
    },
  },

  {
    sub_category_id: 7,
    id: 10,
    item: {
      description: '8mm Grade 60',
      references: [],
      id: null,
      unit: 'm',
      quantity: null,
      kind: 'select',
      dynamic: false,
    },
  },

  {
    sub_category_id: 8,
    id: 11,
    item: {
      description: '10mm Grade 40',
      references: [],
      id: null,
      unit: 'm',
      quantity: null,
      kind: 'select',
      dynamic: false,
    },
  },

  {
    sub_category_id: 8,
    id: 12,
    item: {
      description: '10mm Grade 60',
      references: [],
      id: null,
      unit: 'm',
      quantity: null,
      kind: 'select',
      dynamic: false,
    },
  },

  {
    sub_category_id: 9,
    id: 13,
    item: {
      description: '12mm Grade 40',
      references: [],
      id: null,
      unit: 'm',
      quantity: null,
      kind: 'select',
      dynamic: false,
    },
  },

  {
    sub_category_id: 9,
    id: 14,
    item: {
      description: '12mm Grade 60',
      references: [],
      id: null,
      unit: 'm',
      quantity: null,
      kind: 'select',
      dynamic: false,
    },
  },

  {
    sub_category_id: 10,
    id: 15,
    item: {
      description: '16mm Grade 40',
      references: [],
      id: null,
      unit: 'm',
      quantity: null,
      kind: 'select',
      dynamic: false,
    },
  },

  {
    sub_category_id: 10,
    id: 16,
    item: {
      description: '16mm Grade 60',
      references: [],
      id: null,
      unit: 'm',
      quantity: null,
      kind: 'select',
      dynamic: false,
    },
  },

  {
    sub_category_id: 11,
    id: 17,
    item: {
      description: '20mm Grade 40',
      references: [],
      id: null,
      unit: 'm',
      quantity: null,
      kind: 'select',
      dynamic: false,
    },
  },

  {
    sub_category_id: 11,
    id: 18,
    item: {
      description: '20mm Grade 60',
      references: [],
      id: null,
      unit: 'm',
      quantity: null,
      kind: 'select',
      dynamic: false,
    },
  },

  {
    sub_category_id: 12,
    id: 19,
    item: {
      description: '25mm Grade 40',
      references: [],
      id: null,
      unit: 'm',
      quantity: null,
      kind: 'select',
      dynamic: false,
    },
  },

  {
    sub_category_id: 12,
    id: 20,
    item: {
      description: '25mm Grade 60',
      references: [],
      id: null,
      unit: 'm',
      quantity: null,
      kind: 'select',
      dynamic: false,
    },
  },

  {
    sub_category_id: 13,
    id: 21,
    item: {
      description: '32mm Grade 40',
      references: [],
      id: null,
      unit: 'm',
      quantity: null,
      kind: 'select',
      dynamic: false,
    },
  },

  {
    sub_category_id: 13,
    id: 22,
    item: {
      description: '32mm Grade 60',
      references: [],
      id: null,
      unit: 'm',
      quantity: null,
      kind: 'select',
      dynamic: false,
    },
  },

  {
    sub_category_id: 14,
    id: 23,
    item: {
      description: 'Type',
      references: [],
      id: null,
      unit: 'm2',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 15,
    id: 24,
    item: {
      description: 'Dimensions',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 16,
    id: 25,
    item: {
      description: 'Dimensions',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 17,
    id: 26,
    item: {
      description: '22.5X',
      references: [],
      id: null,
      unit: 'bags',
      quantity: null,
      kind: 'select',
      dynamic: false,
    },
  },

  {
    sub_category_id: 17,
    id: 27,
    item: {
      description: '32.5N',
      references: [],
      id: null,
      unit: 'bags',
      quantity: null,
      kind: 'select',
      dynamic: false,
    },
  },

  {
    sub_category_id: 17,
    id: 28,
    item: {
      description: '42.5N',
      references: [],
      id: null,
      unit: 'bags',
      quantity: null,
      kind: 'select',
      dynamic: false,
    },
  },

  {
    sub_category_id: 17,
    id: 29,
    item: {
      description: '52.5N',
      references: [],
      id: null,
      unit: 'bags',
      quantity: null,
      kind: 'select',
      dynamic: false,
    },
  },

  {
    sub_category_id: 18,
    id: 30,
    item: {
      description: 'Fine gravel',
      references: [],
      id: null,
      unit: 'm3',
      quantity: null,
      kind: 'select',
      dynamic: false,
    },
  },

  {
    sub_category_id: 18,
    id: 31,
    item: {
      description: 'Medium gravel',
      references: [],
      id: null,
      unit: 'm3',
      quantity: null,
      kind: 'select',
      dynamic: false,
    },
  },

  {
    sub_category_id: 18,
    id: 32,
    item: {
      description: 'Coarse gravel',
      references: [],
      id: null,
      unit: 'm3',
      quantity: null,
      kind: 'select',
      dynamic: false,
    },
  },

  {
    sub_category_id: 19,
    id: 33,
    item: {
      description: 'Type',
      references: [],
      id: null,
      unit: 'm3',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 20,
    id: 34,
    item: {
      description: 'Type',
      references: [],
      id: null,
      unit: 'liter',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 21,
    id: 35,
    item: {
      description: 'Type',
      references: [],
      id: null,
      unit: 'm2',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 22,
    id: 36,
    item: {
      description: 'Dimensions',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 23,
    id: 37,
    item: {
      description: 'Dimensions',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 24,
    id: 38,
    item: {
      description: 'Dimensions',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 25,
    id: 39,
    item: {
      description: 'Dimensions',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 26,
    id: 40,
    item: {
      description: 'Dimensions',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 27,
    id: 41,
    item: {
      description: 'Dimensions',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 28,
    id: 42,
    item: {
      description: 'Dimensions',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 29,
    id: 43,
    item: {
      description: 'Dimensions',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 30,
    id: 44,
    item: {
      description: 'Dimensions',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 31,
    id: 45,
    item: {
      description: 'Metal, Dimensions',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 31,
    id: 46,
    item: {
      description: 'Timber. Dimensions',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 32,
    id: 45,
    item: {
      description: 'Metal, Dimensions',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 32,
    id: 46,
    item: {
      description: 'Timber. Dimensions',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 33,
    id: 49,
    item: {
      description: 'Plywood, Dimensions',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 34,
    id: 50,
    item: {
      description: 'Type',
      references: [],
      id: null,
      unit: 'm2',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 35,
    id: 51,
    item: {
      description: 'Clay Tiles, Dimensions',
      references: [],
      id: null,
      unit: 'm2',
      quantity: null,
      kind: 'select',
      dynamic: false,
    },
  },

  {
    sub_category_id: 35,
    id: 52,
    item: {
      description: 'Metal sheets, Dimensions',
      references: [],
      id: null,
      unit: 'm2',
      quantity: null,
      kind: 'select',
      dynamic: false,
    },
  },

  {
    sub_category_id: 35,
    id: 53,
    item: {
      description: 'Plastic sheets, Dimensions',
      references: [],
      id: null,
      unit: 'm2',
      quantity: null,
      kind: 'select',
      dynamic: false,
    },
  },

  {
    sub_category_id: 36,
    id: 54,
    item: {
      description: 'Plastic, Cross-section',
      references: [],
      id: null,
      unit: 'm',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 36,
    id: 55,
    item: {
      description: 'Metal, Cross-section',
      references: [],
      id: null,
      unit: 'm',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 37,
    id: 56,
    item: {
      description: 'Type',
      references: [],
      id: null,
      unit: 'Kg',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 38,
    id: 57,
    item: {
      description: 'Type',
      references: [],
      id: null,
      unit: 'Kg',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 39,
    id: 58,
    item: {
      description: 'Type',
      references: [],
      id: null,
      unit: 'Kg',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 40,
    id: 59,
    item: {
      description: 'Type',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 41,
    id: 60,
    item: {
      description: 'Flexible ducts, material, specs',
      references: [],
      id: null,
      unit: 'm',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 41,
    id: 61,
    item: {
      description: 'Rigid ducts, material, specs',
      references: [],
      id: null,
      unit: 'm',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 41,
    id: 62,
    item: {
      description: 'Filter, Specs',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 41,
    id: 63,
    item: {
      description: 'Insulation, Specs',
      references: [],
      id: null,
      unit: 'unit',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 42,
    id: 64,
    item: {
      description: 'PVC pipes, Dimensions',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 42,
    id: 65,
    item: {
      description: 'PVC connectors, Specs',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 42,
    id: 66,
    item: {
      description: 'Cast iron pipes, Dimensions',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 42,
    id: 67,
    item: {
      description: 'Cast iron connectors, Specs',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 42,
    id: 68,
    item: {
      description: 'Copper pipes, Dimensions',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },

  {
    sub_category_id: 42,
    id: 69,
    item: {
      description: 'Copper connectors, Specs',
      references: [],
      id: null,
      unit: 'pieces',
      quantity: null,
      kind: 'text',
      dynamic: true,
    },
  },
];
