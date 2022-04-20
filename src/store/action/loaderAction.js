export const openLoading = () => {
    return {
        type:"open",
        payload: true
    }
}

export const closeLoading = () => {
    return {
        type:"close",
        payload: false
    }
}