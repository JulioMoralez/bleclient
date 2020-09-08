import { Injectable } from '@angular/core';

export class Message {



  constructor(id: number, message: string, type: number) {
    this.id = id;
    this.message = message;
    this.type = type;
  }

  static readonly DEVICE_DELETE_SUCCESS = new Message(1, 'Устройство удалено', 1);
  static readonly DEVICE_EMPTY_NAME_WARNING = new Message(1, 'Пустое имя', 2);
  static readonly DEVICE_EMPTY_WARNING = new Message(1, 'Не выбрано устройство', 2);
  static readonly DEVICE_ADD_SUCCESS = new Message(1, 'Устройство добавлено', 1);
  static readonly DEVICE_UPDATE_SUCCESS = new Message(1, 'Устройство обновлено', 1);

  static readonly PLACE_DELETE_SUCCESS = new Message(1, 'Помещение удалено', 1);
  static readonly PLACE_EMPTY_NAME_WARNING = new Message(1, 'Пустое имя', 2);
  static readonly PLACE_EMPTY_WARNING = new Message(1, 'Не выбрано устройство', 2);
  static readonly PLACE_ADD_SUCCESS = new Message(1, 'Помещение добавлено', 1);
  static readonly PLACE_UPDATE_SUCCESS = new Message(1, 'Помещение обновлено', 1);

  static readonly BEACON_DELETE_SUCCESS = new Message(1, 'Метка удалена', 1);
  static readonly BEACON_EMPTY_NAME_WARNING = new Message(1, 'Пустое имя', 2);
  static readonly BEACON_EMPTY_WARNING = new Message(1, 'Не выбрано устройство', 2);
  static readonly BEACON_ADD_SUCCESS = new Message(1, 'Метка добавлена', 1);
  static readonly BEACON_UPDATE_SUCCESS = new Message(1, 'Метка обновлена', 1);

  static readonly PLACE_CONNECT_SUCCESS = new Message(1, 'Помещение привязано', 1);
  static readonly PLACE_CONNECT_WARNING = new Message(1, 'Помещение уже привязано', 2);
  static readonly PLACE_DISCONNECT_SUCCESS = new Message(1, 'Привязка помещения удалена', 1);
  static readonly DEVICE_CONNECT_SUCCESS = new Message(1, 'Устройство привязано', 1);
  static readonly DEVICE_CONNECT_WARNING = new Message(1, 'Устройство уже привязано', 2);
  static readonly DEVICE_DISCONNECT_SUCCESS = new Message(1, 'Привязка устройства удалена', 1);

  id: number;
  message: string;
  type: number;
}

@Injectable({
  providedIn: 'root'
})
export class Oper {

  constructor() { }
}

@Injectable({
  providedIn: 'root'
})
export class OperService {
  message: string = null;
  oldMessage: Message = null;
  repeatMessage = 1;
  styleSuccess = 'alert alert-success';
  styleAlarm = 'alert alert-warning';
  style = this.styleSuccess;

  setMessage(message: Message): void {
    if (this.oldMessage === message) {
      this.repeatMessage++;
    } else {
      this.repeatMessage = 1;
    }
    this.oldMessage = message;
    this.message = message.message;
    if (this.repeatMessage > 1) {
      this.message = this.message + ' (' + this.repeatMessage + ')';
    }
    switch (message.type) {
      case 1: {
        this.style = this.styleSuccess;
        break;
      }
      case 2: {
        this.style = this.styleAlarm;
        break;
      }
    }
  }
}
