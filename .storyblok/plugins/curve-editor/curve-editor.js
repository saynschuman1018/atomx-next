const Fieldtype = {
  mixins: [window.Storyblok.plugin],
  template: `
    <div v-if="model.start" class="uk-form-stacked">
      <div class="form__topic">
        <label class="uk-form-label">Curve start</label>
        <input class="uk-width-1-1" v-model="model.start.x" placeholder="x" />
        <input class="uk-width-1-1" v-model="model.start.y" placeholder="y" />
      </div>
      <div class="form__topic">
        <label class="uk-form-label">Control point</label>
        <input class="uk-width-1-1" v-model="model.control.x" placeholder="x" />
        <input class="uk-width-1-1" v-model="model.control.y" placeholder="y" />
      </div>
      <div class="form__topic">
        <label class="uk-form-label">Curve end</label>
        <input class="uk-width-1-1" v-model="model.end.x" placeholder="x" />
        <input class="uk-width-1-1" v-model="model.end.y" placeholder="y" />
      </div>
      <hr />
      <svg ref="box" viewBox="0 0 100 100" preserveAspectRatio="none" @mouseup="drop" @mouseleave="drop">
        <line
          v-bind:x1="model.start.x"
          v-bind:y1="model.start.y"
          v-bind:x2="model.control.x"
          v-bind:y2="model.control.y"
          style="stroke:rgb(0,0,0);stroke-width:0.1;stroke-dasharray: 1 1;"
        />
        <line
          v-bind:x1="model.end.x"
          v-bind:y1="model.end.y"
          v-bind:x2="model.control.x"
          v-bind:y2="model.control.y"
          style="stroke:rgb(0,0,0);stroke-width:0.1; stroke-dasharray: 1 1;"
        />
        <path :d="path" stroke="#aaaaaa" stroke-width="1px" fill="none" />
        <circle
          id="start"
          v-bind:cx="model.start.x"
          v-bind:cy="model.start.y"
          r="2"
          fill="black"
          @mousedown="drag"
        />
        <circle
          id="control"
          v-bind:cx="model.control.x"
          v-bind:cy="model.control.y"
          r="2"
          fill="red"
          @mousedown="drag"
        />
        <circle
          id="end"
          v-bind:cx="model.end.x"
          v-bind:cy="model.end.y"
          r="2"
          fill="black"
          @mousedown="drag"
        />
      </svg>
    </div>`,
  data: () => {
    return {
      moveTarget: null,
    }
  },
  methods: {
    initWith() {
      return {
        plugin: 'curve-editor',
        start: { x: '100', y: '0' },
        control: { x: '25', y: '25' },
        end: { x: '0', y: '100' },
      }
    },
    pluginCreated() {
      console.log('plugin:created')
    },
    drag(event) {
      this.moveTarget = event.currentTarget
      this.$refs.box.addEventListener('mousemove', this.move)
    },
    drop() {
      this.moveTarget = null
      this.$refs.box.removeEventListener('mousemove', this.move)
    },
    move(event) {
      const elem = event.currentTarget.closest("svg")
      const point = elem.createSVGPoint()
      const transform = elem.getScreenCTM().inverse()

      point.x = event.clientX
      point.y = event.clientY

      // Map the screen pixels back to svg coords
      let newPt = point.matrixTransform(transform)

      this.model[this.moveTarget.id].x = newPt.x.toFixed(2)
      this.model[this.moveTarget.id].y = newPt.y.toFixed(2)
    }
  },
  computed: {
    path() {
      return `
        M${this.model.start.x} ${this.model.start.y}
        Q${this.model.control.x} ${this.model.control.y},
        ${this.model.end.x} ${this.model.end.y}
      `;
    },
  },
  watch: {
    'model': {
      handler: function (value) {
        this.$emit('changed-model', value);
      },
      deep: true,
    }
  }
}
