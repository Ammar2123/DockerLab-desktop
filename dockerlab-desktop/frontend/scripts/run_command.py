# scripts/run_command.py
import sys
import subprocess

def main():
    if len(sys.argv) > 1:
        command = sys.argv[1]
        print(f"Running: {command}")  # Log the command
        subprocess.run(f'start cmd /k "{command}"', shell=True)
    else:
        print("No command provided.")

if __name__ == "__main__":
    main()
