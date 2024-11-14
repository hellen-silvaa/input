import { Component, Prop, State, h, Host, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'fsn-input',
  styleUrl: 'fsn-input.css',
  shadow: true,
})
export class FsnInput {
  // Definindo as propriedades que podem ser manipuladas via HTML
  @Prop() placeholder: string;
  @Prop() label: string;
  @Prop() disabled: boolean = false;
  @Prop() optional: boolean = false;
  @Prop() status: string = 'default';
  @Prop() helperText: string = 'Helper Text';
  @Prop() value: string = '';

  // Definindo estados internos do componente
  @State() inputValue: string;

  // Definindo um evento que será emitido quando o valor do input mudar
  @Event() valueChanged: EventEmitter<string>;

  // Inicializando os estados internos com as propriedades
  componentWillLoad() {
    this.inputValue = this.value;
  }

  // Função para lidar com a mudança do valor do input
  handleValueChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.inputValue = target.value;
    this.valueChanged.emit(this.inputValue); // Emitindo o evento com o novo valor
  }

  render() {
    return (
      <Host>
        <div class="container">
          <div class="input-container">
            <label class="label">
              {this.label} {this.optional && <span class="optional">(optional)</span>}
            </label>
            <input
              class={`input ${this.status}`}
              type="text"
              placeholder={this.placeholder}
              value={this.inputValue}
              disabled={this.disabled}
              onInput={(event) => this.handleValueChange(event)} // Adicionando o evento de input
            />
            {this.helperText && <p class="helper-text">{this.helperText}</p>}
          </div>
        </div>
      </Host>
    );
  }
}