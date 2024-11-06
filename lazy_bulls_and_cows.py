import random
import itertools


def init_secret_number():
    return [list(num) for num in itertools.permutations(range(10), digits)]

def get_bulls_and_cows(secret, guess):
    bulls = sum(s == g for s, g in zip(secret, guess))
    cows = sum(min(secret.count(d), guess.count(d)) for d in set(guess)) - bulls
    return bulls, cows

def generate_response(guess, available_numbers):
    response = {}
    for num in available_numbers:
        bulls, cows = get_bulls_and_cows(num, guess)
        if (bulls, cows) not in response:
            response[(bulls, cows)] = 1
        else:
            response[(bulls, cows)] += 1
    max_count = max(response.values())
    max_responses = [key for key, value in response.items() if value == max_count]
    chosen_response = random.choice(max_responses)
    
    updated_available_numbers = [num for num in available_numbers if get_bulls_and_cows(num, guess) == chosen_response]
    
    return chosen_response, updated_available_numbers

digits = 4


def main():
    attempts = 0
    available_numbers = init_secret_number()
    print("Welcome to Bulls and Cows game!")
    print(f"I will update my choice count dynamitically. Try to guess it!")

    while True:
        #print(f"Available numbers: {available_numbers}")
        guess = input(f"I have {len(available_numbers)} possible {digits}-digit secret numbers for choice. Enter your guess: \n")
        if len(guess) != digits or not guess.isdigit():
            print(f"Please enter a {digits}-digit number.")
            continue

        guess = [int(d) for d in guess]
        attempts += 1

        (bulls, cows), available_numbers = generate_response(guess, available_numbers)
        print(f"Bulls: {bulls}, Cows: {cows}")

        if bulls == digits:
            print(f"Congratulations! You've guessed the number in {attempts} attempts.")
            break

if __name__ == "__main__":
    main()
