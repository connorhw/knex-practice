const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: 'postgresql://dunder_mifflin@localhost/knex-practice',
})

console.log('knex and driver installed correctly for drills.js')

function costForEachList() {
    knexInstance
    .select('category')
    .sum('price as total')
    .from('shopping_list')
    .groupBy('category')
    .then(result => {
      console.log('COST PER CATEGORY')
      console.log(result)
    })
}
costForEachList()

/* 
function atLeastXDaysAgo(daysAgo) {
    knexInstance
        .select('name', 'date_added')
        .from('shopping_list')
        .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
        )
        .orderBy([
            { column: 'date_added', order: 'DESC' },
        ])
        .then(result => {
            console.log(result)
        })
}
atLeastXDaysAgo(7)
*/

/*
function paginatePage(pageNumber) {
    const perPage = 6
    const offset = perPage * (pageNumber - 1)
    knexInstance
        .select(*)
        .from('shopping_list')
        .limit(perPage)
        .offset(offset)
        .then(result => {
            console.log(result)
        })
}
paginatePage(5)
*/

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
