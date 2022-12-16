<?php

namespace App\DTO;

use App\Document\Task;

class FindAllResponse
{

    /**
    @var Task[]
     */
    private $todosList;
    private int $totalLength;

    public function __construct()
    {
        $this->todosList = [];
        $this->totalLength = 0;
    }

    // getter and setter for todosList and length
    public function getTodosList():array
    {
        return $this->todosList;
    }

    public function getTotalLength():int
    {
        return $this->totalLength;
    }

    public function setTodosList(array $todosList):self
    {
        $this->todosList = $todosList;
        return $this;
    }

    public function setTotalLength(int $totalLength):self
    {
        $this->totalLength = $totalLength;
        return $this;
    }
}