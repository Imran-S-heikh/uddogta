module.exports = [
    {
        'type': 'pattern',
        'name': 'Grid Template Column',
        'matcher': 'Gtc',
        'allowParamToValue': true,
        'styles': {
            'grid-template-columns': '$0 $1 $2 $3 $4 $5 $6 $7 $8 $9'
        }
    },
    {
        'type': 'pattern',
        'name': 'Grid Template Column With Reapeat',
        'matcher': 'Gtcr',
        'allowParamToValue': true,
        'styles': {
            'grid-template-columns': 'repeat($0, 1fr)'
        }
    },
    {
        'type': 'pattern',
        'name': 'Grid/Flex Gap',
        'matcher': 'Gap',
        'allowParamToValue': true,
        'styles': {
            'gap': '$0'
        }
    },
    {
        'type': 'pattern',
        'name': 'Grid Row',
        'matcher': 'Gr',
        'allowParamToValue': true,
        'styles': {
            'grid-row': '$0/$1'
        }
    },
    {
        'type': 'pattern',
        'name': 'Grid Column',
        'matcher': 'Gc',
        'allowParamToValue': true,
        'styles': {
            'grid-column': '$0/$1'
        }
    },
    {
        'type': 'pattern',
        'name': 'Grid Column Start',
        'matcher': 'Gcstart',
        'allowParamToValue': true,
        'styles': {
            'grid-column-start': '$0'
        }
    },

]