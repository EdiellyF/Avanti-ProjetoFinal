export const formatDate = (dateString) => {
    if (!dateString) return ""
  
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString
  
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }
  
  export const formatPhone = (phone) => {
    if (!phone) return ""
  
    // Remove non-numeric characters
    const numericPhone = phone.replace(/\D/g, "")
  
    // Format based on length
    if (numericPhone.length === 11) {
      return `(${numericPhone.slice(0, 2)}) ${numericPhone.slice(2, 7)}-${numericPhone.slice(7)}`
    } else if (numericPhone.length === 10) {
      return `(${numericPhone.slice(0, 2)}) ${numericPhone.slice(2, 6)}-${numericPhone.slice(6)}`
    }
  
    return phone
  }
  
  export const formatStatus = (status) => {
    if (!status) return ""
  
    const statusMap = {
      PERDIDO: "Perdido",
      ENCONTRADO: "Encontrado",
    }
  
    return statusMap[status] || status
  }
  