import Vue from 'vue';

const $ = require('jquery');

global.$ = global.jQuery = $;

require('../sass/style.scss');

require('bootstrap/dist/css/bootstrap.css');

require('bootstrap');

window.aronela = new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.gameIsRunning = true;
            this.turns = [];
        },
        giveUp: function () {
            this.gameIsRunning = false;
        },
        attack: function () {
            var damage = this.damage(3, 10)
            this.monsterHealth -= damage;
            this.turns.push({
                text: "PLAYER ATTACK MONSTER WITH: " + damage,
                is_player: true
            });

            if (!this.checkWin()) {
                damage = this.damage(5, 12)
                this.playerHealth -= damage;
                if (!this.checkWin()) {
                    this.turns.push({
                        text: "MONSTER ATTACK PLAYER WITH: " + damage,
                        is_player: false
                    });
                }
            }
        },
        specialAttack: function () {
            var damage = this.damage(10, 20);
            this.monsterHealth -= damage;
            this.turns.push({
                text: "PLAYER ATTACK MONSTER WITH: " + damage,
                is_player: true
            });
            if (!this.checkWin()) {
                damage = this.damage(5, 12);
                this.playerHealth -= damage;
                if (!this.checkWin()) {
                    this.turns.push({
                        text: "MONSTER ATTACK PLAYER WITH: " + damage,
                        is_player: false
                    });
                }
            }
        },
        heal: function () {
            if (this.playerHealth < 90) {
                this.playerHealth += 10;

                this.playerHealth -= this.damage(5, 12);
                this.checkWin();
            }
        },
        damage: function (min, max) {
            return Math.max(Math.floor(Math.random() * (max - min + 1))) + min;
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                this.monsterHealth = 0;
                if (confirm("Yon won! Do you want to restart?")) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                this.playerHealth = 0;
                if (confirm("Yon lost! Do you want to restart?")) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});

