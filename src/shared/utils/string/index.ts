export const formatPrice = (value: string | number) => {
   const valueToString = Number(value)

   return valueToString.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
   })
}