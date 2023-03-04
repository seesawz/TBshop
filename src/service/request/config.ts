let BASE_URL = 'http://43.139.230.109:9000'

const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {

    BASE_URL = 'http://43.139.230.109:9000'

} else if (process.env.NODE_ENV === 'production') {

    BASE_URL = 'http://43.139.230.109:9000'

} else {

    BASE_URL = 'http://43.139.230.109:9000'

}

export { BASE_URL, TIME_OUT }
