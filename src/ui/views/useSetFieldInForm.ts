
export const useSetFieldInForm = (setFormFieldValues: React.Dispatch<React.SetStateAction<any>>) => {

  return (field: string, value: any) => {
    setFormFieldValues((prevState: any) => ({
      ...prevState,
      [field]: value
    }))
  }
}