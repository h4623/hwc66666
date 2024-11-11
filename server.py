# Python 3
from http.server import HTTPServer, SimpleHTTPRequestHandler
import socket

class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

# 获取本地IP地址
hostname = socket.gethostname()
local_ip = socket.gethostbyname(hostname)

# 启动服务器
port = 8000
server = HTTPServer((local_ip, port), Handler)
print(f'Server running at http://{local_ip}:{port}')
server.serve_forever() 