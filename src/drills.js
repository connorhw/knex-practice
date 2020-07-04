const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: 'postgresql://dunder_mifflin@localhost/knex-practice',
})

console.log('knex and driver installed correctly for drills.js')

function paginatePage(pageNumber) {
    const perPage = 6
    const offset = perPage * (pageNumber - 1)
    knexInstance
        .select()
        .from('shopping_list')
        .limit(perPage)
        .offset(offset)
        .then(result => {
            console.log(result)
        })
}
paginatePage(5)

/*
function searchByTerm(searchTerm) {
    knexInstance
        .select('name')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result)
        })
}
searchByTerm('burger')

*/
