import { RESTDataSource } from "@apollo/datasource-rest";
import { FilmModel, PeopleModel } from "../models.js";

export class GhibliAPI extends RESTDataSource {
  baseURL = "https://ghibliapi.dev/";

  async getFilms() {
    const data = await this.get<FilmModel[]>('films')

    let films = []
    for(let index in data){
      const film_id = data[index]["id"]
      const film = await this.getFilmById(film_id)
      films.push(film)
    }
    return films
  }

  async getFilmById(id: string) {
    const data = await this.get<FilmModel>(`films/${id}`)
    const {people} = data
    if(people.length == 1 && people[0].endsWith("/people/")){
      data['people'] = []
    }
    return data
  }

  async getFilmPeoples(uri_list: string[]) {
    let peoples = []
    for(let index in uri_list){
      const people = await this.getFilmPeopleById(uri_list[index])
      people["eyeColor"] = people["eye_color"] 
      peoples.push(people)
    }
    return peoples
  }

  async getFilmPeopleById(uri: string) {
    return this.get<PeopleModel>(`${uri}`)
  }



  async getPeoples() {
    const data = await this.get<PeopleModel[]>('people')

    let peoples = []
    for(let index in data){
      const people_id = data[index]["id"]
      const people = await this.getPeopleById(people_id)
      people["eyeColor"] = people["eye_color"]
      peoples.push(people)
    }
    console.log(peoples)
    return peoples
  }

  async getPeopleById(id: string) {
    const data = await this.get<PeopleModel>(`people/${id}`)
    const {films} = data
    if(films.length == 1 && films[0].endsWith("/films/")){
      data['films'] = []
    }
    return data
  }

  async getPeopleFilms(uri_list: string[]) {
    let films = []
    for(let index in uri_list){
      const film = await this.getPeopleFilmById(uri_list[index])
      films.push(film)
    }
    return films
  }

  async getPeopleFilmById(uri: string) {
    return this.get<FilmModel>(`${uri}`)
  }
}