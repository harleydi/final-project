

function getStates() {
    var headers = new Headers();
    headers.append("X-CSCAPI-KEY", "N2thVDhZSHN2VkZIWEpOVTVXb2ZDblJtWXcwa1RMSEFoZ1FnaENFSQ");

    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };

    fetch("https://api.countrystatecity.in/v1/countries/US/states", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error)); 

    console.log(result)
}

console.log(getStates())