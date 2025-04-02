export class WebSocketService {
  private socket: WebSocket | null = null;
  private listeners: { [key: string]: ((data: any) => void)[] } = {};

  connect(token: string) {
    this.socket = new WebSocket(`ws://localhost:5000?token=${token}`);

    this.socket.onopen = () => {
      console.log("WebSocket connected");
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const { type, payload } = data;

        if (this.listeners[type]) {
          this.listeners[type].forEach((callback) => callback(payload));
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    this.socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  on(type: string, callback: (data: any) => void) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(callback);
  }

  off(type: string, callback: (data: any) => void) {
    if (this.listeners[type]) {
      this.listeners[type] = this.listeners[type].filter(
        (cb) => cb !== callback
      );
    }
  }

  send(type: string, payload: any) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type, payload }));
    } else {
      console.error("WebSocket not connected");
    }
  }
}

export const websocketService = new WebSocketService();
