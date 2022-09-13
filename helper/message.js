const useError = (errCode)=> {
    if(errCode === "ER_DUP_ENTRY") {
      return { message: "Email Already Use" }
    }
}

const useFailed = (errCode)=> {
    if(errCode === "FAILED") {
      return { message: "Wrong Email or Password" }
    }
    
}

module.exports = {
    useError,
    useFailed
}

