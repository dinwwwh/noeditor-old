import antfu from '@antfu/eslint-config'

export default antfu(
  {
    react: true,
    ignores: ['**/*.gen.ts'],
  },
  {
    rules: {
      'react/prefer-destructuring-assignment': ['off'],
    },
  },
)
