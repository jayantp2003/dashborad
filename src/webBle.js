let bluetoothDeviceConnected;
let gattRxCharecteristic;
let gattTxCharecteristic;

const bleService 		  = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const bleRxCharecteristic = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';
const bleTxCharecteristic = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';

export function isWebBluetoothEnabled() {
	if (navigator.bluetooth) {
		return true;
	} else {
		// ChromeSamples.setStatus('Web Bluetooth API is not available.\n' +
		// 	'Please make sure the "Experimental Web Platform features" flag is enabled.');
		return false;
	}
}

export function onDisconnected(event) {
	const device = event.target;

	console.log(`Device ${device.name} is disconnected.`);

	connectGatt();
}

export async function getDeviceInfo() {
	if (!isWebBluetoothEnabled()) return;

	let options = {
		acceptAllDevices: true,
		optionalServices: [bleService]
	};

	try {
		console.log('Requesting Bluetooth Device...');
		console.log('with ' + JSON.stringify(options));
		bluetoothDeviceConnected = await navigator.bluetooth.requestDevice(options);

		console.log('> Name:             ' + bluetoothDeviceConnected.name);
		console.log('> Id:               ' + bluetoothDeviceConnected.id);
		console.log('> Connected:        ' + bluetoothDeviceConnected.gatt.connected);

		bluetoothDeviceConnected.addEventListener('gattserverdisconnected', onDisconnected);
	}

	catch (error) {
		console.log('Argh! ' + error);
	}
}

export function handleChanged(event) {
	const value = event.target.value;
	// console.log('Received ' + value.getUint8(0));
	
	const decoder = new TextDecoder('utf-8');
	var ans = decoder.decode(value);
	console.log(`${decoder.decode(value)}`);
}

export async function connectGatt() {
	if (bluetoothDeviceConnected.gatt.connected && gattTxCharecteristic) {
		Promise.resolve();
	}
	else {
		try {
			const server = await bluetoothDeviceConnected.gatt.connect();
			const service = await server.getPrimaryService(bleService);

			gattTxCharecteristic = await service.getCharacteristic(bleTxCharecteristic);
			gattRxCharecteristic = await service.getCharacteristic(bleRxCharecteristic);
		}
		catch (err) {
			console.log(err);
		}
	}
}

export async function read() {
	try {
		if (!bluetoothDeviceConnected)
			await getDeviceInfo();

		await connectGatt();
		await start();
	}
	catch (err) {
		console.log(err)
	}	
}



export async function start() {
	try {
		await gattTxCharecteristic.startNotifications();
		await gattTxCharecteristic.addEventListener('characteristicvaluechanged', handleChanged);
	}
	catch (err) {
		console.log(err);
	}
}

export async function stop() {
	try {
		await gattTxCharecteristic.removeEventListener('characteristicvaluechanged', handleChanged);
		gattTxCharecteristic.stopNotifications();
	}
	catch (err) {
		console.log(err);
	}
}