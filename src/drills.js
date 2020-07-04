const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: 'postgresql://dunder_mifflin@localhost/knex-practice',
})

console.log('knex and driver installed correctly for drills.js')

/* 
3. Get all items added after date:
A function that takes one parameter for daysAgo which will be a number 
representing a number of days.This function will query the shopping_list
table using Knex methods and select the rows which have a date_added 
that is greater than the daysAgo.
*/
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
/*
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
