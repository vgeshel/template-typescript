import pino from 'pino'

export const logger = pino({
  // eslint-disable-next-line n/no-process-env -- logger is a foundational utility; env access is intentional
  level: process.env.LOG_LEVEL ?? 'info',
  formatters: {
    level: (label) => {
      return { level: label }
    },
  },
})

export function createChildLogger(bindings: Record<string, unknown>) {
  return logger.child(bindings)
}
