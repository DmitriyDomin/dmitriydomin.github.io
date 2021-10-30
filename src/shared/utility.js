export const updateObject = (oldObject, updatedProperties) => {
  console.log(
    {
      ...oldObject,
      ...updatedProperties
    }
  )
  return {
    ...oldObject,
    ...updatedProperties
  }
}
