module.exports = {
  tld: <%- JSON.stringify(tld) %>,
  lists: <%- JSON.stringify(lists) %>,
  minLimit: <%= minLimit %>,
  maxLimit: <%= maxLimit %>,
  multiple: <%= multiple %>
};
