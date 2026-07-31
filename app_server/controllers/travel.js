const tripsEndpoint = 'http://localhost:3000/api/trips';

const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json'
  }
};

/* GET travel page */
const travel = async (req, res) => {
  try {
    const response = await fetch(tripsEndpoint, options);

    if (!response.ok) {
      let errorMessage =
        `API request failed with status ${response.status}.`;

      try {
        const errorBody = await response.json();

        if (errorBody.message) {
          errorMessage = errorBody.message;
        }
      } catch (parseError) {
        // Keep the original status-based message.
      }

      return res.status(response.status).render('travel', {
        title: 'Travlr Getaways',
        trips: [],
        message: errorMessage
      });
    }

    const responseBody = await response.json();

    let trips = responseBody;
    let message = null;

    if (!Array.isArray(responseBody)) {
      trips = [];
      message = 'API lookup error.';
    } else if (responseBody.length === 0) {
      message = 'No trips exist in the database.';
    }

    return res.render('travel', {
      title: 'Travlr Getaways',
      trips,
      message
    });
  } catch (err) {
    console.error('Travel controller error:', err);

    return res.status(500).render('travel', {
      title: 'Travlr Getaways',
      trips: [],
      message: 'Unable to retrieve trip data.'
    });
  }
};

module.exports = {
  travel
};
