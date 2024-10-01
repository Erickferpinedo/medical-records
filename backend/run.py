import subprocess

def run_command(command):
    """Run a shell command and handle errors."""
    try:
        result = subprocess.run(command, shell=True, check=True, text=True)
        print(f"Command '{command}' executed successfully.")
        return result
    except subprocess.CalledProcessError as e:
        print(f"Error while executing command '{command}': {e}")
        exit(1)

def main():
    # Step 1: Alembic revision --autogenerate with a message
    run_command('alembic revision --autogenerate -m "Fixed user Model"')

    # Step 2: Alembic upgrade to the latest migration
    run_command('alembic upgrade head')

    # Step 3: Start the FastAPI server with Uvicorn
    run_command('uvicorn main:app --reload')

if __name__ == "__main__":
    main()
