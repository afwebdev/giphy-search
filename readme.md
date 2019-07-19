# GiphySearch

Hitting Giphy API using FETCH, displaying results on the DOM.
Users are able to store 'favourites' via local storage.

Local storage value is stored as JSON string:
"["user1", "user2", "etc",]"
And later parsed back to an array to be processed via JSON.parse()

User created favourites are rendered as additional buttons on the DOM, along with the default built in simpsons buttons.
