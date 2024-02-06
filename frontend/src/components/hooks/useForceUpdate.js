import { useState } from "react"

export const useForceUpdate = () => {
  const [refresh, setRefresh] = useState({})
  const forceUpdate = () => {setRefresh({})}
  return [forceUpdate, refresh]
}