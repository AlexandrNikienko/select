const getTemplate = (data = [], placeholder = 'Please select') => {
	const items = data.map(item => {
		return `<li class="select__item" data-type="item" data-id="${item.id}">${item.value}</li>`
	});

	return `<div class="select__input" data-type="input">
				<span class="select__placeholder" data-type="placeholder">${placeholder}</span>
				<i class="fas fa-chevron-down"></i>
			</div>

			<div class="select__dropdown">
				<ul class="select__list">
					${items.join('')}
				</ul>
			</div>`
}

export class Select {
	constructor(selector, options) {
		this.options = options;
		this.el = document.querySelector(selector);
		this.selectedId = options.selectedId;
		this.#render();
		this.#setup();
	}

	#render() {
		const { data, placeholder, selectedId } = this.options;
		this.el.classList.add('select');
		this.el.innerHTML = getTemplate(data, placeholder);
	}

	#setup() {
		const self = this;
		const { selectedId } = this.options;
		this.clickHandler = this.clickHandler.bind(this);
		this.el.addEventListener('click', this.clickHandler);
		this.placeholder = this.el.querySelector('[data-type="placeholder"');
		this.selectedId ? this.select(this.selectedId) : null;

		document.addEventListener('click', function(e) {
			if (!e.target.closest('.select') && self.isOpen) {
				self.close();
			}
		})
	}

	clickHandler(event) {
		event.stopPropagation();
		const { type } = event.target.dataset;

		if (type === 'input') {
			this.toggle();
		} else if (type === 'item') {
			const { id } = event.target.dataset;
			this.select(id);
		}
	}

	get isOpen() {
		return this.el.classList.contains('is-open');
	}

	get current() {
		return this.options.data.find(item => item.id === +this.selectedId);
	}

	toggle() {
		this.isOpen ? this.close() : this.open();
	}

	select(id) {
		this.selectedId = id;
		this.placeholder.textContent = this.current.value;
		this.el.querySelectorAll('[data-type="item"]').forEach(el => el.classList.remove('is-selected'));
		this.el.querySelector(`[data-id="${id}"]`).classList.add('is-selected');

		this.options.onSelect ? this.options.onSelect(this.current) : null;

		this.close();
	}

	open() {
		this.el.classList.add('is-open');
	}

	close() {
		this.el.classList.remove('is-open');
	}

	destroy() {
		this.el.removeEventListener('click', this.clickHendler);
		this.el.innerHTML = '';
	}
}
