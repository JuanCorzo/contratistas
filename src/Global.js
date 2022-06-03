import Cookies from 'universal-cookie';
const cookies = new Cookies(); 

var Global = {
    // url: 'http://172.16.202.198:4000/api/',
    url: 'https://contratistas-back-end.herokuapp.com/api/',
    // url: 'http://localhost:4000/api/',
    consg: "Indef",
    autentica:  { 'Authorization': 'Bearer '+ cookies.get("token"),
    mapsKey: "AIzaSyDwldwLM7DOqg3NRm3UMmAgoEtdU8SaH6k"
}
};
export default Global;