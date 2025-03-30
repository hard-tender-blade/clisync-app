import validator from 'validator'

export const validateEmail = (email: string) => {
    return validator.isEmail(email)
}

export const validatePassword = (password: string): boolean => {
    return validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
}

export const validateName = (name: string): boolean => {
    const hasOneSpace = name.split(' ').length - 1 === 1
    return hasOneSpace
}

export const validatePhoneNumber = (phoneNumber: string): boolean => {
    return (
        validator.isMobilePhone(phoneNumber.replaceAll(' ', '')) &&
        validator.contains(phoneNumber, '+')
    )
}

export const validateCity = (city: string): boolean => {
    return city.length > 0
}

export const validateAddress = (address: string): boolean => {
    return address.length > 0
}

export const validatePostalCode = (postalCode: string): boolean => {
    return validator.isPostalCode(postalCode.replaceAll(' ', ''), 'any')
}
