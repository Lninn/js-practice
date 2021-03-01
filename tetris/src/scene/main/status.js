export const getStatus = () => {
  let status = 0

  const isNormal = () => status === 0
  const isAnimation = () => status === 1
  const isEnd = () => status === 2

  const toggleNormal = () => {
    status = 0
  }
  const toggleAnimation = () => {
    status = 1
  }
  const toggleEnd = () => {
    status = 2
  }

  return {
    isNormal,
    isAnimation,
    isEnd,

    toggleNormal,
    toggleAnimation,
    toggleEnd,
  }
}
