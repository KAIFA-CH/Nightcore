'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'VideoController.index').as('Main')
Route.get('/watch/:id', 'VideoController.watch').as('Watch')
Route.get('/lang/:lang', 'LangController.switch')
Route.on('/add').render('add').as('Add')
Route.post('/add', 'AddVidController.add')
//Route.get('/home', 'UserController.index').as('Dashboard')
//Route.get('/profile/:username', 'ProfileController.index')
//Route.on('/login').render('login')
//Route.post('/login', 'UserController.store').validator('Login')
//Route.get('/logout', 'UserController.logout')
//Route.post('/register', 'UserController.register').validator('Register')
//Route.on('/register').render('register')
