// export const firstUpperCase = ([first, ...rest]) => first?.toUpperCase() + rest.join('')

export const firstUpperCase = (str) => { return str.charAt(0).toUpperCase() + str.slice(1); }