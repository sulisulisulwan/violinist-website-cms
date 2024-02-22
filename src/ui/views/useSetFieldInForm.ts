
export const useSetFieldInForm = (setFormFieldValues: React.Dispatch<React.SetStateAction<any>>) => {

  return (field: string, value: any) => {
    // console.log(value)
    setFormFieldValues((prevState: any) => ({
      ...prevState,
      [field]: value
    }))
  }
}