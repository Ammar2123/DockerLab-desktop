# scripts/run_command.py
import sys
import subprocess

def main():
    if len(sys.argv) > 2:
        os_type = sys.argv[1]
        command = sys.argv[2]
        print(f"Running on {os_type}: {command}")

        if os_type.lower() == "ubuntu":
            # You may adjust this depending on your Ubuntu terminal environment
            subprocess.run(['gnome-terminal', '--', 'bash', '-c', f'{command}; exec bash'])
        else:
            subprocess.run(f'start cmd /k "{command}"', shell=True)
    else:
        print("❌ Not enough arguments provided.")

if __name__ == "__main__":
    main()
