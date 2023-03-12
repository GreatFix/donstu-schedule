import { AnimatePresence, motion } from 'framer-motion'

interface FadeProps {
  children: JSX.Element
  transitionKey: string
}

export const Fade = ({ children, transitionKey }: FadeProps) => {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={transitionKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
