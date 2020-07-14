const ShoppingService = require('../src/shopping-list-service')
const knex = require('knex')
const { expect } = require('chai')
const { expectCt } = require('helmet')

describe(`Shopping list service object`, function() {
    let db
    let testShopping = [
        //name, price, category, checked, date_added
        {
            id: 1,
            name: 'Chicken Salad',
            price: "4.77",
            category: 'Lunch',
            checked: false,
            date_added: new Date('2029-01-22T16:28:32.615Z'),

        },
        {
            id: 2,
            name: 'T-Bone Steak',
            price: "19.01",
            category: 'Main',
            checked: false,
            date_added: new Date('2029-01-22T16:28:32.615Z'),
        },
        {
            id: 3,
            name: 'Belvita',
            price: "0.99",
            category: 'Snack',
            checked: true,
            date_added: new Date('2029-01-22T16:28:32.615Z'),
        },

    ]

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.DB_URL
        })
    })

    before(() => db('shopping_list').truncate())

    afterEach(() => db('shopping_list').truncate())
    
    after(() => db.destroy())
    /*
    it(`should run the tests`, () => {
      expect(true).to.eql(false)
    })
    */
   
    context(`Given 'shopping_list' has data`, () => {
        beforeEach(() => {
            return db
                .into('shopping_list')
                .insert(testShopping)
        })
       it(`getShoppingList() resolves all items from 'shopping_list' table`, () => {
           // test that ShoppingService.getShoppingList gets data from table
           return ShoppingService.getShoppingList(db)
            .then(actual => {
                expect(actual).to.eql(testShopping)
            })
       })
       it(`getById() resolves an article by id from 'shopping_list' table`, () => {
           const thirdId = 3
           const thirdTestItem = testShopping[thirdId - 1]
           return ShoppingService.getById(db, thirdId)
            .then(actual => {
                expect(actual).to.eql({
                    id: thirdId,
                    name: thirdTestItem.name,
                    price: thirdTestItem.price,
                    category: thirdTestItem.category,
                    checked: thirdTestItem.checked,
                    date_added: thirdTestItem.date_added,
                })
            })
       })
       it(`deleteItem() removes an article by id from 'shopping_list' table`, () => {
           const itemId = 3
           return ShoppingService.deleteItem(db, itemId)
            .then(() => ShoppingService.getShoppingList(db))
            .then(allItems => {
                // copy the test items array without the "deleted" item
                const expected = testShopping.filter(item => item.id !== itemId)
                expect(allItems).to.eql(expected)
            })
       })
       it(`updateItem() updates an item from the 'shopping_list' table`, () => {
           const idOfItemToUpdate = 3
           const newItemData = {
               name: 'updated name',
               price: '0.99',
               category: 'Snack',
               checked: false,
               date_added: new Date(),
           }
           return ShoppingService.updateItem(db, idOfItemToUpdate, newItemData)
            .then(() => ShoppingService.getById(db, idOfItemToUpdate))
            .then(item => {
                expect(item).to.eql({
                    id: idOfItemToUpdate,
                    ...newItemData,
                })
            })
       })
   })
   context(`Given 'shopping_list' has no data`, () => {
       it(`getShoppingList() resolves an empty array`, () => {
           return ShoppingService.getShoppingList(db)
            .then(actual => {
                expect(actual).to.eql([])
            })
       })
       it(`insertListItem() inserts an item and resolves the item with an 'id'`, () => {
        const newListItem = {
          name: 'Test new title',
          price: '7.81',
          category: 'Lunch',
          checked: true,
          date_added: new Date('2020-01-01T00:00:00.000Z'),
        }
        return ShoppingService.insertListItem(db, newListItem)
            .then(actual => {
                expect(actual).to.eql({
                    id: 1,
                    name: newListItem.name,
                    price: newListItem.price,
                    category: newListItem.category,
                    checked: newListItem.checked,
                    date_added: newListItem.date_added,
                })
            })
      })
   })
  })