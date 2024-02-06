# NODEJS-FILE-MANAGER

A command-line file manager application built with Node.js, leveraging the filesystem and streams for efficient file manipulation. It offers functionalities such as file operations, compression and decompression, system information retrieval, and hash calculations.

## Features

- Basic file operations: **copy**, **move**, **delete**, **rename**
- **Compression** and **decompression** using the Brotli algorithm
- Retrieval of **system information** (CPU details, home directory, etc.)
- **Hash calculations** for files
- Built entirely with Node.js's built-in modules, **no external dependencies**

## Getting Started

### Prerequisites

- Node.js (version 20 LTS or newer)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd node-js-file-manager
   ```

### Running the Application

Start the application with a username of your choice:
```bash
npm start -- --username=<your_username>
```

## Usage

### Basic Commands

- **Navigate Up**
  ```
  up
  ```
- **Change Directory**
  ```
  cd <directoryPath>
  ```
- **List Directory Contents**
  ```
  ls
  ```
- **Read File**
  ```
  cat <filename>
  ```
- **Create File**
  ```
  add <newFileName>
  ```
- **Rename File**
  ```
  rn <oldFileName> <newFileName>
  ```
- **Copy File**
  ```
  cp <sourcePath> <destinationPath>
  ```
- **Move File**
  ```
  mv <sourcePath> <destinationPath>
  ```
- **Delete File**
  ```
  rm <filename>
  ```

### Advanced Commands

- **Calculate File Hash**
  ```
  hash <path_to_file>
  ```
- **Compress File**
  ```
  compress <path_to_file> <path_to_destination>
  ```
- **Decompress File**
  ```
  decompress <path_to_compressed_file> <path_to_destination>
  ```

### System Information Commands

- **Display the System's End-of-Line Marker**
  ```
  os --EOL
  ```
- **Display Information About the CPU(s)**
  ```
  os --cpus
  ```
- **Display the Current User's Home Directory**
  ```
  os --homedir
  ```
- **Display the Current System User Name**
  ```
  os --username
  ```
- **Display the CPU Architecture**
  ```
  os --architecture
  ```

## Exiting the Application

To exit the File Manager, enter:
```
.exit
```

## Contributing

Contributions are welcome! Feel free to submit pull requests or create issues for bugs and feature requests.

## License

This project is open source and available under the [MIT License](LICENSE).
