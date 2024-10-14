import configparser
import json
import pytz
from datetime import datetime
from requests import Session
from dateutil import parser

def get_info():
    # Read the API key from the coinmarket.ini file
    config = configparser.ConfigParser()
    config.read('coinmarket.ini')
    api_key = config['DEFAULT'].get('API_KEY', '')  # Retrieve API key with default fallback

    # Set up the request parameters and headers for GCAT
    url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest'
    parameters = {'symbol': 'GCAT', 'convert': 'USD'}
    headers = {
        'Accepts': 'application/json',
        'X-CMC_PRO_API_KEY': api_key  # Use the retrieved API key correctly
    }

    # Send the request and retrieve the response
    session = Session()
    session.headers.update(headers)
    try:
        response = session.get(url, params=parameters)
        response.raise_for_status()  # Ensure we raise an error for bad responses
        info = response.json()
    except Exception as e:
        print(f"Error retrieving data: {e}")
        return

    try:
        # Extract the desired information from the response
        data = info['data']['GCAT']
        name = data['name']  # Correct key for name
        symbol = data['symbol']  # Correct key for symbol
        rank = data.get('cmc_rank', 'N/A')  # Handle missing rank
        total_supply = data.get('total_supply', 'N/A')  # Handle missing total supply
        circulating_supply = data.get('circulating_supply', 'N/A')  # Handle missing circulating supply
        market_cap = data['quote']['USD'].get('market_cap', 'N/A')
        price = data['quote']['USD'].get('price', 'N/A')
        market_cap_dominance = data['quote']['USD'].get('market_cap_dominance', 'N/A')
        percent_change_1h = data['quote']['USD'].get('percent_change_1h', 'N/A')
        percent_change_24h = data['quote']['USD'].get('percent_change_24h', 'N/A')
        volume_24h = data['quote']['USD'].get('volume_24h', 'N/A')
        volume_change_24h = data['quote']['USD'].get('volume_change_24h', 'N/A')
        timestamp = info['status']['timestamp']

        # Convert the timestamp to a timezone-aware datetime object
        timestamp_local = parser.parse(timestamp).astimezone(pytz.timezone('Turkey'))

        # Format the timestamp as desired
        formatted_timestamp = timestamp_local.strftime('%Y-%m-%d %H:%M:%S')

        # Print the information
        print(f'Name: {name}, Symbol: {symbol}, Price: ${price:,.2f}, Percent change (1h): {percent_change_1h}%, '
              f'Percent change (24h): {percent_change_24h}%, Total supply: {total_supply}, Circulating supply: {circulating_supply}, '
              f'Market capitalization: ${market_cap:,.2f}, Market capitalization dominance: {market_cap_dominance}%, '
              f'Volume (24h): {volume_24h}, Volume change (24h): {volume_change_24h}%, Timestamp: {formatted_timestamp}')

    except KeyError as e:
        print(f"Key error: {e} - Some expected data may be missing from the API response.")
    except Exception as e:
        print(f"Unexpected error: {e}")

get_info()
