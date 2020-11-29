export const seedData = {
  'default': {
    'search': '',
    'filter': {},
    'sort': {}
  },
  'onlySearch': {
    'search': 'hospital',
    'filter': {},
    'sort': {}
  },
  'onlyFilter': {
    'search': '',
    'filter': {
      "job_type": "Per-Diem"
    },
    'sort': {}
  },
  'textAndFilter': {
    'search': 'hospital',
    'filter': {
      "job_type": "Per-Diem"
    },
    'sort': {}
  },
  'multipleFilters': {
    'search': '',
    'filter': {
      "job_type": "Per-Diem",
      "work_schedule": "Night shift"
    },
    'sort': {}
  },
  'multipleFiltersWithText': {
    'search': 'hospital',
    'filter': {
      "job_type": "Per-Diem",
      "work_schedule": "Night shift"
    },
    'sort': {}
  },
  'onlySortWithAsc': {
    'search': '',
    'filter': {},
    'sort': {
      'job_title': 'asc'
    }
  },
  'onlySortWithDesc': {
    'search': '',
    'filter': {},
    'sort': {
      'job_title': 'desc'
    }
  },
  'sortWithTextAndFilter': {
    'search': 'hospital',
    'filter': {
      "job_type": "Per-Diem"
    },
    'sort': {
      'job_title': 'desc'
    }
  },
  createdSortWithTextAndFilter: {
    'search': 'hospital',
    'filter': {
      "job_type": "Per-Diem"
    },
    'sort': {
      'created': 'desc'
    }
  }
}