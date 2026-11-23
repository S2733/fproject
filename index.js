import readlineSync from "readline-sync";

const contacts = [
	{
		name: "Олена",
		phone: "+380501234567",
		email: "olena@example.com",
	},
	{
		name: "Максим",
		phone: "+380679876543",
		email: "maxim@example.com",
	},
];

function fixNumber(number) {
	if (!number.startsWith("+380")) {
		number = "+380" + number;
	}
	return number;
}

function showAllContacts() {
	if (contacts.length === 0) {
		console.log("Список контактів порожній.");
		readlineSync.question();
		return;
	}

	console.log("=== Всі контакти ===");
	contacts.forEach((contact, index) => {
		console.log(
			`${index + 1}. ${contact.name} - ${contact.phone} - ${contact.email}`,
		);
	});

	readlineSync.question();
}

function addContact() {
	console.log("=== Додати контакт ===");

	console.log("Введіть ім'я контакту: ");
	const name = readlineSync.question().trim();

	console.log("Введіть телефон контакту: ");
	const phone = fixNumber(readlineSync.question().trim());

	console.log("Введіть email контакту: ");
	const email = readlineSync.question().trim();

	contacts.push({ name, phone, email });
}

function filterByField(field, text) {
	console.log(text);
	const fieldToFind = readlineSync.question().trim();

	const findedContacts = contacts.filter((contact) => {
		return contact[field].toLowerCase().includes(fieldToFind.toLowerCase());
	});

	if (findedContacts.length === 0) {
		console.log("Нічого не знайдено.");
	} else {
		findedContacts.forEach((userName, index) => {
			console.log(
				`${index + 1}. ${userName.name} - ${userName.phone} - ${userName.email}`,
			);
		});
	}

	readlineSync.question();
}

function filterContactsMenu() {
	console.log("=== Фільтр контактів ===");
	console.log("1 - Фільтр за ім'ям");
	console.log("2 - Фільтр за номером");
	console.log("3 - Фільтр за email");

	let choice = readlineSync.question("> ").trim();

	if (choice === "1") {
		filterByField("name", "Введіть ім'я контакту: ");
	} else if (choice === "2") {
		filterByField("phone", "Введіть номер контакту: ");
	} else if (choice === "3") {
		filterByField("email", "Введіть email контакту: ");
	}
}

function sortContactsByField(field, direction = "asc") {
	const sorted = [...contacts].sort((a, b) => {
		const comparison = a[field].localeCompare(b[field], "uk");
		return direction === "desc" ? -comparison : comparison;
	});

	console.log("=== Результат сортування ===");
	sorted.forEach((contact, index) => {
		console.log(
			`${index + 1}. ${contact.name} - ${contact.phone} - ${contact.email}`,
		);
	});

	readlineSync.question();
}

function sortMenu() {
	console.log("=== Сортування ===");
	console.log("1 - За ім'ям (A-Я)");
	console.log("2 - За ім'ям (Я-А)");
	console.log("3 - За email (A-Z)");
	console.log("4 - За email (Z-A)");

	const choice = readlineSync.question("> ").trim();

	if (choice === "1") {
		sortContactsByField("name");
	} else if (choice === "2") {
		sortContactsByField("name", "desc");
	} else if (choice === "3") {
		sortContactsByField("email");
	} else if (choice === "4") {
		sortContactsByField("email", "desc");
	}
}

function deleteContact() {
	if (contacts.length === 0) {
		console.log("Список контактів порожній.");
		readlineSync.question();
		return;
	}

	console.log("=== Видалення контакту ===");
	contacts.forEach((contact, index) => {
		console.log(
			`${index + 1}. ${contact.name} - ${contact.phone} - ${contact.email}`,
		);
	});

	console.log("Введіть номер контакту для видалення: ");
	const input = readlineSync.question("").trim();
	const index = Number(input) - 1;

	if (!Number.isInteger(index) || index < 0 || index >= contacts.length) {
		console.log("Некоректний номер контакту.");
		readlineSync.question();
		return;
	}

	const removedList = contacts.splice(index, 1);
	const removedContact = removedList[0];

	console.log(`Контакт "${removedContact.name}" видалено.`);

	readlineSync.question();
}

while (true) {
	console.log("=== Адресна книга ===");
	console.log(`* Кількість контактів (${contacts.length}) *`);
	console.log("1 - Показати всі");
	console.log("2 - Додати контакт");
	console.log("3 - Фільтр");
	console.log("4 - Сортування");
	console.log("5 - Видалити");
	console.log("0 - Вийти");

	let choice = readlineSync.question("> ").trim();

	if (choice === "0") {
		break;
	} else if (choice === "1") {
		showAllContacts();
	} else if (choice === "2") {
		addContact();
	} else if (choice === "3") {
		filterContactsMenu();
	} else if (choice === "4") {
		sortMenu();
	} else if (choice === "5") {
		deleteContact();
	} else {
		console.log("Помилка.");
		readlineSync.question();
	}
}
